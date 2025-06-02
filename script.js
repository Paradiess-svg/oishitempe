document.addEventListener("DOMContentLoaded", function () {
  fetch('data.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");
      const items = xml.getElementsByTagName("item");
      const container = document.querySelector(".product-container");

      for (let i = 0; i < items.length; i++) {
        const nama = items[i].getElementsByTagName("nama")[0].textContent;
        const ukuran = items[i].getElementsByTagName("ukuran")[0].textContent;
        const gambar = items[i].getElementsByTagName("gambar")[0].textContent;
        const link = items[i].getElementsByTagName("link")[0].textContent;

        const produkHTML = `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="produk-item shadow rounded">
                <a class="produk-link" href="${link}" target="_blank">
                    <div class="produk-hover">
                    <div class="produk-hover-content"><i class="fa-solid fa-cart-shopping fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src="${gambar}" alt="${nama} ${ukuran}" />
                </a>
                <div class="produk-caption">
                    <div class="produk-caption-heading">${nama}</div>
                    <div class="produk-caption-subheading text-muted">${ukuran}</div>
                </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", produkHTML);
      }
    })
    .catch(error => console.error("Gagal memuat data XML:", error));
});