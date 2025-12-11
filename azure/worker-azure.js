export default {
  async fetch(request) {
    const url = new URL(request.url)
    const storageAccount = "jamaalahmedcrc2025" // Replace with your Azure Storage account name
    // const baseUrl = `https://${storageAccount}.z13.web.core.windows.net`
    const baseUrl = `https://${storageAccount}.z9.web.core.windows.net`

    // Serve static assets normally
    if (url.pathname.startsWith("/assets/")) {
      const azureUrl = `${baseUrl}${url.pathname}`
      const response = await fetch(azureUrl, request)
      return new Response(response.body, response)
    }

    // For everything else, serve index.html
    const indexUrl = `${baseUrl}/index.html`
    const indexResp = await fetch(indexUrl, request)

    // optional: make sure correct caching headers
    const newHeaders = new Headers(indexResp.headers)
    newHeaders.set("Cache-Control", "public, max-age=300")
    newHeaders.set("Content-Type", "text/html; charset=utf-8")

    return new Response(indexResp.body, {
      status: indexResp.status,
      headers: newHeaders,
    })
  },
}