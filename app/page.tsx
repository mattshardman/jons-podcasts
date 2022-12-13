import { Home } from "../screens/Home";

const getCategories = async () => {
  try {
    const result = await fetch(
      "https://api.rephonic.com/api/common/categories/",
      {
        method: "GET",
        headers: new Headers({
          "X-Rephonic-Api-Key": process.env.API_KEY as string,
        }),
      }
    );

    const json = await result.json();
    const o = json?.categories?.map((cat: any) => ({
      id: cat.id,
      label: cat.slug,
    }));

    if (!o) {
      return [{ id: "", label: "Select a category" }];
    }
    return [{ id: "", label: "Select a category" }, ...o];
  } catch (err) {
    console.log(err);
  }
};

const Page = async () => {
  const options = await getCategories();

  return <Home options={options} />;
};

export default Page;
