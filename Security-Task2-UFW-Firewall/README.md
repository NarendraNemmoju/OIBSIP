# Basic Firewall Configuration with UFW

## Project Overview

This project demonstrates a basic firewall configuration using UFW (Uncomplicated Firewall) on Ubuntu through WSL.

UFW provides a simple way to manage firewall rules on a Linux system and control incoming and outgoing network traffic.

## Objectives

- Install and configure UFW.
- Enable the firewall.
- Allow SSH traffic.
- Deny HTTP traffic.
- Allow HTTPS traffic.
- Allow DNS traffic.
- Verify the active firewall rules.
- Create a reusable UFW configuration script.

## Firewall Rules

| Port | Service | Action | Purpose |
|---|---|---|---|
| 22 | SSH | ALLOW | Permit SSH connections |
| 80 | HTTP | DENY | Block HTTP traffic |
| 443 | HTTPS | ALLOW | Permit secure web traffic |
| 53 | DNS | ALLOW | Permit DNS traffic |

The firewall also uses the default policy:

- Incoming traffic: **DENY**
- Outgoing traffic: **ALLOW**

## Why These Rules Were Chosen

### SSH — Port 22

SSH was allowed because it is commonly used for secure remote administration of Linux systems.

### HTTP — Port 80

HTTP was denied because it is unencrypted web traffic. This configuration demonstrates how a firewall can block a specific type of incoming traffic.

### HTTPS — Port 443

HTTPS was allowed because it is commonly used for encrypted web communication.

### DNS — Port 53

DNS was allowed to demonstrate an additional network service rule.

## Files

- `ufw_configuration.sh` — Bash script that applies the firewall configuration.
- `ufw_status.png` — Screenshot showing the active UFW rules.
- `README.md` — Project documentation.

## Verification

The firewall was verified using:

```bash
sudo ufw status verbose 