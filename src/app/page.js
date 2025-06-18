import { auth } from "./_lib/auth";

export default async function Home() {
  const userInfo = await auth();
  if (userInfo) {
    console.log(`User Info: ${JSON.stringify(userInfo)}`);
    return (
      <div className="text-center p-5">
        <h1 className="display-4 text-primary mb-4">
          Welcome Back, {userInfo.name}
        </h1>
        <p className="lead mb-5">
          Explore users, connect with us, or log in to your account.
        </p>
      </div>
    );
  }
}
