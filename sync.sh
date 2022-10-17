#!/bin/bash
rsync --exclude-from=.gitignore --exclude=.git -av ./ bertrand@totalpartysolutions.smittn.com:/home/bertrand/totalpartysolutions/
