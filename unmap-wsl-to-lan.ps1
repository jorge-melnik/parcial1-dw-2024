# Define los puertos a eliminar
$ports = @(80, 443)

# Elimina la configuración de portproxy existente para cada puerto
foreach ($port in $ports) {
    netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0
}

Write-Host "Portproxy configuraciones eliminadas para los puertos $($ports -join ', ')"
