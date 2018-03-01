#!/usr/bin/python3

import os
import optparse
#pip3 install pywinrm
import winrm
from winrm.protocol import Protocol

op = optparse.OptionParser()
op.add_option("-t", action="store", dest="host")
op.add_option("-u", action="store", dest="user")
op.add_option("-p", action="store", dest="pasw")
op.set_defaults(user='Administrator')
op.set_defaults(pasw='password1X')

opts, args = op.parse_args()
if opts.host == None:
    print("Usage: pywsh.py -t host_ip [ -u username ] [ -p password ]")
    os._exit(1)
host = opts.host
if opts.user != None:
    user = opts.user
if opts.pasw != None:
    pasw = opts.pasw

p = Protocol(
        endpoint='http://' + host + ':5985/wsman',
        transport='ntlm',
        username=user,
        password=pasw
        )

sh = p.open_shell()
rin = 'hostname'

while rin != 'exit':
    if rin != None and rin != '':
        if rin.find("cd ") == 0:
            cds = rin[3:]
            cds.strip()
            if cds != None and cds != '':
                p.close_shell(sh)
                sh = p.open_shell(working_directory=cds)
            rin = 'cd'

        try:
            cmd = p.run_command(sh, rin, [])
            rout, rerr, stat = p.get_command_output(sh, cmd)
            if rout != None and rerr != '':
                t = rout.decode('utf-8')
                if t != None:
                    print("%s" % t.strip())
            if rerr != None and rerr != '':
                t = rerr.decode('utf-8')
                if t != None:
                    print("%s" % t.strip())
            p.cleanup_command(sh, cmd)
        except:
            print("Unexpected error happened!")
    rin = input("> ")
    if rin != None:
        rin.strip()

try:
    p.close_shell(sh)
except:
    pass

