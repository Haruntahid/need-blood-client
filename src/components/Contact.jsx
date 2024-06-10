function Contact() {
  return (
    <>
      <h2 className="text-center text-red-500 text-3xl lg:text-5xl font-bold mt-14 lg:mt-28">
        Connect With Us!
      </h2>
      <div className="grid w-full mt-10 grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-red-50">
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Let&apos;s talk!
            </h2>
            <div className="dark:text-gray-600">
              Please Share Your Openion!!
            </div>
          </div>
          <img
            src="https://i.ibb.co/PD7bQTR/Red-Cross-Blood-social-sharing-image-jpg-img.jpg"
            alt=""
            className="w-full lg:w-[80%]"
          />
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder=""
              className="w-full p-3 rounded-lg mt-2 border border-red-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 rounded-lg mt-2 border border-red-300 "
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              className="w-full p-3 rounded-lg mt-2 border border-red-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-red-500 text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
