#!/bin/bash

# Enable UFW firewall
sudo ufw --force enable

# Allow SSH
sudo ufw allow ssh

# Deny HTTP
sudo ufw deny http

# Allow HTTPS
sudo ufw allow https

# Allow DNS
sudo ufw allow 53

# Display firewall status
sudo ufw status verbose