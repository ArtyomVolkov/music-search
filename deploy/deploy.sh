echo "Starting deployment"
export SSHPASS=$REMOTE_PASSWORD
sshpass -e ssh -o stricthostkeychecking=no accord@ec2-52-14-232-217.us-east-2.compute.amazonaws.com bash -x /opt/redeploy.sh
echo "Deployment finished"
