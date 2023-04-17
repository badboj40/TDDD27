import requests

url = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/%7Bname%7D/"

headers = {
	"X-RapidAPI-Key": "b41f441a44msh205258985fa3fd0p162968jsna501ac32a342",
	"X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers)

print(response.text)