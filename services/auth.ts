export const verifyUsernameExists = async (
  username: string,
): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.API_URL}/users/verify/${username}`);
    const data = await res.json();
    return !!data.exists;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const createUser = async (data: {
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  password: string;
}): Promise<boolean> => {
  try {
    const formData = new FormData();

    const uri = data.avatarUrl;
    const name = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(name as string);
    const type = match ? `image/${match[1]}` : `image`;

    // @ts-expect-error: special react native format for form data
    formData.append("avatar_image", { uri, name, type });
    formData.append("display_name", data.displayName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await fetch(`${process.env.API_URL}/users/`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const result = await res.json();

    return !!result.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};
