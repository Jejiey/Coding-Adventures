#!/usr/bin/bash
#may have to chmod +x new... 
#cd then ./new..



i=0
    RED='\033[0;31m'        #https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
    GRN='\033[0;32m'
    NC='\033[0m' 
while [ $i -lt 10 ]
do
    word=$( shuf -n 1 words.txt | tr -d ' \n')
                               
      printf  "${NC}$word"


    if [[ $(wget -S --spider http://$word.com  2>&1 | grep 'HTTP/1.1 200 OK') ]]; \
   then   
      printf  " ${GRN}-Online\n"

   xdg-open http://$word.com
   i=$((i+1))

   else
    i=$((i+1))
          

  printf  " ${RED}-Not Online\n"



 fi
done


