# Obtiene la IP actual de la máquina Windows en la red local
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -match "Wi-Fi" }).IPAddress

# Define la IP de WSL, asumiendo que no cambia
$wslIpAddress = "172.20.189.18"

# Define los puertos a utilizar
$ports = @(80, 443)

# Elimina cualquier configuración de portproxy existente
foreach ($port in $ports) {
    netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0
}

# Añade nuevas configuraciones de portproxy
foreach ($port in $ports) {
    netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIpAddress
}

Write-Host "Portproxy configurado para IP $ipAddress con reenvío a $wslIpAddress en los puertos $($ports -join ', ')"
