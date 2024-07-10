export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-4 h-[55px]">
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by
          ProReferral Ltd
        </p>
      </aside>
    </footer>
  );
}
