import Footer from "./components/footer";
import MyNavbar from "./components/header";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <MyNavbar></MyNavbar>
        <main className="container flex-grow-1 py-4">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
