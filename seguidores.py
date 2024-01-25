import requests

# URL de la API de Twitch para obtener la lista de canales seguidos
url = 'https://api.twitch.tv/TheKingCerberu/channels/followers'

# Realizar la solicitud GET
response = requests.get(url)

# Verificar si la solicitud fue exitosa (código de respuesta 200)
if response.status_code == 200:
    # Convertir la respuesta JSON a un diccionario de Python
    data = response.json()

    # Imprimir el resultado
    print(data)
else:
    # Imprimir un mensaje de error si la solicitud no fue exitosa
    print(response.status_code)
    print(f"Error: {response.status_code}, {response.text}")
