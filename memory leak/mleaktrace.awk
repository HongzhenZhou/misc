#!/bin/awk -f

BEGIN {
	has_str2num = (strtonum (x)) == "0"
	ferr = 0
}

function hex2num(s) {
	if (has_str2num)
		return strtonum(s)

	num = 0

	if (substr(s, 1, 2) == "0x") {
		s = substr(s, 3)
		l = length(s)
		for (i = 1; i <= l; i++) {
			c = substr(s, i, 1)
			c = tolower(c)
			c = index("123456789abcdef", c)
			num = num * 16 + c
		}
	}

	return num
}

function printh(p, s, v) {
	if (v > 1048576)
		printf "%s%s%.2f MB\n", p, s, (v / 1048576)
	else if (v > 1024)
		printf "%s%s%.2f KB\n", p, s, (v / 1024)
	else
		printf "%s%s%d B\n", p, s, v
}

$3 == "+" || $3 == ">" { 
	if ($5 != "" && $2 != "") {
		i = hex2num($5)
		if (i >= 0) {
			addr[$4] = i
			c = $2
			p = 0
			do {
				c = substr(c, p + 1)
				p = index(c, "/")
			} while (p > 0)
			call[$4] = c
		}
	}
}

$3 == "-" || $3 == "<" {
	if ($4 in addr && call[$4] != "") {
		delete addr[$4]
		delete call[$4]
	} else {
		if ($4 != "0" && $4 != "0x0") {
			c = $2
			p = 0
			do {
				c = substr(c, p + 1)
				p = index(c, "/")
			} while (p > 0)
			if (c in wrong)
				wrong[c] += 1
			else
				wrong[c] = 1
			ferr = 1
		}
	}
}

END {
	total = 0
	for (a in addr) {
		if (addr[a] > 0) {
			if (call[a] in leak)
				leak[call[a]] += addr[a]
			else
				leak[call[a]] = addr[a]
			total += addr[a]
		}
	}
	if (total > 0) {
		print "\tcaller\t\t\tallcated bytes"
		PROCINFO["sorted_in"] = "@val_num_desc"
		for (c in leak) {
			printh(c, "\t=>\t", leak[c])
		}
		printh("\nTotal potential leaks:", "\t\t", total)
	}
	if (ferr == 1) {
		print "------------------------------\nwrong arguments passed to free():"
		for (c in wrong) {
			printf "%s\t\t%d\n", c, wrong[c]
		}
	}
}
