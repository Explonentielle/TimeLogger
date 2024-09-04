export const Footer = async () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border  px-4">
      <div className="my-4 mx-auto w-full max-w-screen-xl p-4 sm:flex sm:items-center sm:justify-between items-center">
        <span className="text-sm text-muted-foreground sm:text-center">
          Easy Log © {currentYear}{" "}
          <a
            href="https://get-testimonials.com"
            className="hover:underline"
          ></a>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="/" className="hover:underline">
              App
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
