export default function ListNotFound() {
  return (
    <div className="page-container py-8">
      <p className="text-5xl md:text-6xl capitalize py-24">
        List not found...{" "}
        <span aria-hidden className="max-md:hidden">
          ¯\_(ツ)_/¯
        </span>
      </p>
      <p className="text-xl md:text-2xl">
        The list you are looking for does not exist or has been deleted. Please
        make sure you have the correct URL.
        <br />
        <br />
        <span className="font-bold text-orange-400">Important Note: </span>All
        lists' data is stored in your browser's local storage, so if you copied
        the URL from another browser or device, the list will not be found here.
        <br />
        <br />
        If you want to access the list here, you can{" "}
        <span className="font-bold">export</span> the list from the other
        browser/device and <span className="font-bold">import</span> it here
        (from the sidebar).
      </p>
    </div>
  );
}
