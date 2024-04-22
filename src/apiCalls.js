export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (shortUrl, longUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: "POST",
    body: JSON.stringify({
      long_url: longUrl,
      title: shortUrl,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
)
.then(res => res.json())
}

