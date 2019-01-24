var shell = require('shelljs')
shell.config.verbose = true

shell.exec('ssh root@xxx.abc.com " mkdir -p /usr/share/websites/xxx "')

shell.exec('scp -r dist/* root@xxx.abc.com:/usr/share/websites/xxx/')
