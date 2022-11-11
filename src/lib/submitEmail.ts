const submitEmail = (email: string) => fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email
  })
});
export default submitEmail;
