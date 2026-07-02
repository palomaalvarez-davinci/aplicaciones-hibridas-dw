export function getLibroImageSrc(img) {
  if (!img) return "/images/mh.png"
  if (img.startsWith("http")) return img
  if (img.startsWith("/images/")) return img
  if (img.startsWith("/uploads/")) return "http://localhost:3333" + img
  return "http://localhost:3333/uploads/" + img
}
