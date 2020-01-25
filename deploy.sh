clear
ssh ahmed@138.68.11.216 'rm -rf /home/ahmed/staging/*'
cd ..
scp -r public/* ahmed@138.68.11.216:~/staging

