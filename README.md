# IMPACT-Data-Leak
How I got access to over 35,000 photos of IMPACT applicants and volunteers, including IDs, driving licenses, passports etc.

So, as I logged in to my IMPACT account and waited for the page to load, I thought I saw a mugshot instead of my profile photo. Weird.
First thing that popped to mind is that maybe the developer of the website put a temporary profile photo and forgot to delete it, so it was being loaded first and then swapped for the real image of the scholar.
Just out of curiosity, I went checking the HTML info using the built-in inspection tool in Chrome.

![impact1](https://user-images.githubusercontent.com/45766976/113693413-408c3e80-96d7-11eb-8dbe-35a4b9bfa80e.png)

The path to the photo was a relative path. "./Documents/AppPicture/12345.jpg"
As the current path is "https://impact.fidfimpact.org:2096", the path above must be "https://impact.fidfimpact.org:2096/Documents/AppPicture/12345.jpg".
I put that in the address bar and indeed got my picture. So far so good.

![impact2](https://user-images.githubusercontent.com/45766976/113695760-e93b9d80-96d9-11eb-8312-fe4fd7804552.png)

But I noticed this GET request doesn't appear to have any authentication. What if I change 12345.jpg to 12346.jpg? Will I get someone else's photo?
So I tried it, and... Voilà!

![impact3](https://user-images.githubusercontent.com/45766976/113698351-0d4cae00-96dd-11eb-927d-e238eb7fe648.png)

Not only that I have no problem accessing other scholars' photos, the photos are ordered sequentially, and even worse- ANYONE anywhere in the world can access them. There's no need to log in, just enter the URI and you get the photo!

So I wrote a short script attached here to check how many photos are exposed to the world and what kind of pictures are there exactly.
What I found out was frightening:
The database contained over 35,000 photos of IMPACT applicants and volunteers, including IDs, driving licenses, passports etc.

![impact4](https://user-images.githubusercontent.com/45766976/113699306-0c684c00-96de-11eb-98e9-042b7cf6f25c.png)

So, to sum up: Tens of thousands of ex-IDF soldiers' head shots, IDs, driving licenses, passports... All of it exposed for anyone who enters the above URI. No authentication needed.

Considering the fact that every other day we hear about an organization that has been hacked, databases leaked, Iranian and other hacker groups attacking tons of Israeli organizations and especially organizations related to the IDF- that was pretty scary.

I contacted IMPACT organization right away. To their credit they answered quickly, thanked me and told me they're taking care of this ASAP, and they did.
If you try to access the above URIs now you will have to provide credentials.
The developers now use a more secure method: the URI of the photo is now

"https://impact.fidfimpact.org:2096/api/RGApplicants/GetImage/12345?k=6j4ded6f9d4f6tfc9752b865era0f8053y0df870a3r97a66g7c8d4072b9f0da4",

meaning each image has a long random key which must be provided in the GET request in order to access the image. Wrong key will display an error.

I learned that sometimes you can stumble-upon an exposed database and get access to sensitive data just by being curious and noticing a mistake. It doesn't have to be as complicated as assembly attacks (like ROP), or network attacks (like IP/DNS/ARP spoofing). 

Be aware of security and data breaches. Report them. Prevent the next leak!










