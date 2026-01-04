fetch("http://localhost:5000/api/reviews/admin/pending", {
  headers: {
    Authorization: "aeorra_admin_secret",
  },
})
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("reviews").innerHTML =
      JSON.stringify(data, null, 2);
  });
