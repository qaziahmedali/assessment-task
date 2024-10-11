export const getBody = async (req: Request) => {
  try {
    return await req.json();
  } catch (error) {
    return {};
  }
};
