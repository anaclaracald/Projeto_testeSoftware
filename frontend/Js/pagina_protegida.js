(async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    window.location.href = "/perfil.html"
    return
  }

  const res = await fetch("/me", {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) {
    localStorage.removeItem("token")
    window.location.href = "/perfil.html"
  }
})()