export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12 text-center text-sm text-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <p>&copy; {new Date().getFullYear()} Industrial Area Spare Parts. All rights reserved.</p>
      </div>
    </footer>
  );
}
