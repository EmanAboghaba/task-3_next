"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function MyNavbar() {
  const pathname = usePathname();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link href="/" className="navbar-brand">
          App
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/addUser", label: "add User" },
              { href: "/users", label: "Users" },
              { href: "/login", label: "Login" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} passHref legacyBehavior>
                <Nav.Link active={pathname === href}>{label}</Nav.Link>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
