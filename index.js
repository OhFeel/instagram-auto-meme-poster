const Instagram = require('instagram-web-api')
 const username = ''
 const password = ''
 
const client = new Instagram({ username, password })
const got = require('got');
async function login() {
await client.login()
console.log(`[InstaGram] Logged In`)
}
 login()

 async function test()  {
   got('https://www.reddit.com/r/memes/random/.json')
		.then(async response => {
            const [list] = JSON.parse(response.body)
			const [post] = list.data.children
            
    const photo = post.data.url;
    if(post.data.over_18) return test()
    if(photo.endsWith('.gif')) return test()
    if(photo.endsWith('.png')) return test()

 const { media } = await client.uploadPhoto({ photo: photo, caption: `${post.data.title} - posted by ${post.data.author} on ${post.data.subreddit_name_prefixed}`, post: 'feed' })
    console.log(`[InstaGram] Posted new Meme: https://www.instagram.com/p/${media.code}/`)
      })
  }
  setTimeout(() => {
    test()
  }, 10000);

  setInterval(() => {
    test()
}, 3600000);


