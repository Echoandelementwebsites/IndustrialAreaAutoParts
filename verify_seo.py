from playwright.sync_api import sync_playwright
import json

def verify_seo():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        print("--- Verifying Homepage ---")
        try:
            page.goto("http://localhost:3000", timeout=60000) # 60s timeout

            # Check for hidden H1
            h1 = page.locator("h1.sr-only")
            if h1.count() > 0:
                print(f"Found hidden H1: '{h1.inner_text()}'")
            else:
                print("Hidden H1 not found")

            # Check for LocalBusiness JSON-LD
            scripts = page.locator('script[type="application/ld+json"]')
            found_local_business = False
            for i in range(scripts.count()):
                content = scripts.nth(i).inner_text()
                try:
                    data = json.loads(content)
                    if data.get("@type") == "AutoPartsStore":
                        print("Found AutoPartsStore JSON-LD")
                        print(json.dumps(data, indent=2))
                        found_local_business = True
                        break
                except:
                    continue

            if not found_local_business:
                print("AutoPartsStore JSON-LD not found")

            page.screenshot(path="verification_homepage.png")

        except Exception as e:
            print(f"Homepage verification failed: {e}")

        print("\n--- Verifying Products Canonical ---")
        try:
            # Visit products page with some query params to test canonical
            page.goto("http://localhost:3000/products?category=Engine&make=Toyota", timeout=60000)

            # Check for canonical link
            canonical = page.locator('link[rel="canonical"]')
            if canonical.count() > 0:
                href = canonical.get_attribute("href")
                print(f"Found canonical URL: {href}")
                expected = "https://industrial-parts.com/products"
                if href == expected:
                    print("Canonical URL is correct (stripped params)")
                else:
                    print(f"Canonical URL is INCORRECT. Expected {expected}, got {href}")
            else:
                print("Canonical link not found")

            page.screenshot(path="verification_products.png")

        except Exception as e:
            print(f"Products verification failed: {e}")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_seo()
