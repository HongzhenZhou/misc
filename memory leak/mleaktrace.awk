#!/bin/awk -f

BEGIN {
	has_str2num = (strtonum (x)) == "0"
	ferr = 0
	last_attr = ""
	curr_stack = ""
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

substr($0, 1, 1) != " " && ($2 == "+" || $2 == ">") {
	if (last_addr && curr_stack) {
		stack[last_addr] = curr_stack
		if (curr_stack in caller)
			caller[curr_stack] += addr[last_addr]
		else
			caller[curr_stack] = addr[last_addr]
	}
	if ($3 != 0) {
		if ($1 in addr) {
			print "duplicate alloced addr", $1, $2, line[$i], NR
			exit
		}
		addr[$i] = $3
		line[$1] = NR
	}
	last_addr = $1
	curr_stack = ""
}

substr($0, 1, 1) != " "  && ($2 == "-" || $2 == "<") {
	if (last_addr && curr_stack) {
		stack[last_addr] = curr_stack
		if (curr_stack in caller)
			caller[curr_stack] += addr[last_addr]
		else
			caller[curr_stack] = addr[last_addr]
	}
	if ($1 in addr) {
		if ($1 in stack) {
			if (sstack[$1] in caller) {
				caller[stack[$1]] -= addr[$1]
				if (caller[stack[$1]] == 0)
					delete caller[stack[$1]]
		}
		delete addr[$1]
		delete line[$1]
	} else {
		if ($1 in wrong)
			print "duplicate addr to free", $2, wrong[$1], NR
		wrong[$1] = NR
		ferr++
	}
	last_addr = ""
	curr_stack = ""
}

substr($0, 1, 1) == " " {
	if (last_addr) {
		if (!curr_stack)
			curr_stack = $0 "\n"
		else
			curr_stack = curr_stack $0 "\n"
	}
}

END {
	total = 0
	for (a in addr) {
		total += caller[a]
		print "\nLeaked", caller[a], "bytes: "
		print a
	}
	if (total > 0)
		printh("\nTotal potential leaks:", "\t\t", total)
	}
	if (ferr > 0) {
		print "------------------------------\nwrong arguments passed to free()", ferr, "times:"
		for (c in wrong)
			printf "  line %dn", wrong[c]
	}
}
