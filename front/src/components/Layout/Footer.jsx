const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-[#4A4A4A] px-4 py-3 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        <span className="text-[#D35400] font-semibold">© {year}</span> Ferretería y Moto Repuestos Urkupiña. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;