#!/bin/awk -f

BEGIN {
        has_str2num = (strtonum (x)) == "0"
        fatal = 0
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

substr($0, 1, 1) != " " && ($2 == "+" || $2 == "<") && $3 > 0 {
        if ($1 in addr) {
                delete addr[$1]
        } else {
                if ($4 in hash)
                        hash[$4] += $3
                else
                        hash[$4] = $3
        }
}

substr($0, 1, 1) != " "  && ($2 == "-" || $2 == ">") {
        if ($1 in addr) {
                print "duplicate free addr", $1, "at line", NR, addr[$1]
                fatal = 1
                exit
        }
        addr[$1] = NR
}

END {
        all = 0
        n = 0

        if (fatal)
                exit

        delete addr

        folder = ""
        n = split(FILENAME, parts, "/")
        for (i = 1; i < n; i++) {
                print "parts[",i,"]=",parts[i]
                if (i == 1)
                        folder = parts[i]
                else
                        folder = folder "/" parts[i]
        }
        if (index(FILENAME, "/") == 0 && index(folder, "/") == 1)
                folder = "." folder

        for (h in hash) {
                n++
                order[n] = h
        }

        for (i = 1; i <= n; i++) {
                for (j = i + 1; j <= n; j++) {
                        if (hash[order[i]] > hash[order[j]]) {
                                t = order[i]
                                order[i] = order[j]
                                order[j] = t
                        }
                }
        }

        for (i = 1; i <= n; i++) {
                h = order[i]
                all += hash[h]
                name = folder "/stack/" h
                if (system("test -f " name) == 0) {
                        printh("\nLeaked", " ", hash[h])
                        while ((getline line < name) > 0)
                                print line
                }
        }

        if (all > 0)
                printh("\nTotal potential leaks:", "\t\t", all)
}
