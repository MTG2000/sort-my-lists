# Smart Lists Sorter

An app that allows you to create and sort list of games/movies/books & order them smartly with minimal efforts.
If you have a list of 1000 items & you want to add a new one but not sure where exactly, we will ask you to compare it against at MAXIMUM 10 other items, & we will figure out the exact place it should be in!

## Frequently Asked Questions

### **What is SortMyLists?**

SortMyLists is an innovative web application designed to take the stress out of creating and sorting your backlog lists. No more random placements – it's an app that uses a smart algorithm to help you sort your items efficiently and accurately, all with a sprinkle of fun!

### **How does SortMyLists differ from other lists sorting websites?**

Unlike most listing websites that leave you in a pickle when adding new items to a lengthy list, SortMyLists uses a smart algorithm to find the perfect place for your item. Even if your list has over 1000 items, the app is smart enough to ask you just 10 questions to find the right place for the newcomer.

### **Can you tell me more about this smart algorithm?**

For those with a tech itch, here it is: SortMyLists uses AVL trees at its core. These are a type of self-balancing binary search trees that helps us reduce the search area by half with each user response. You can find plenty of resources about them online.

### **What's the story behind SortMyLists?**

SortMyLists started as a personal project out of frustration with having a massive games/movies/books lists and having a lot of difficulty keeping them in a meaningful order.
I showed it to a couple of friends & they loved it, so I polished and refined the concept, and decided to share it with everyone since it seems to be a common pain!

### **Can I rearrange the order of my items manually?**

Sure thing! You have all the normal sorting options like drag-&-drop or moving items up and down the list. Our smart algorithm will recalibrate and maintain the overall integrity of your list.

### **How does the items comparison work?**

When the smart algorithm needs to compare 2 items in a list, it's like setting up a duel. Two games/books/movies. One choice. You decide which comes first! Based on your selection, our algorithm shrinks the search area, ultimately unearthing the sweet spot for your item.

### **Is there a limit to my items list?**

The sky's the limit here! The algorithm handles even gigantic lists without breaking a sweat. Only 10 comparisons are needed for a list of 1000 items list!

### **Where is my lists data stored?**

Everything's stored locally on your browser – we don't store anything remotely. So we **highly** recommend backing up your data regularly. You can do this easily via our simple 'Export Data to a Backup File' button in the sidebar.

### **Where does the games/movies/books data come from?**

The data is fetched from igdb.com/omdbapi/google-books-api respectively. So if you find anything missing, go there & update it.

### **Is SortMyLists free?**

Absolutely! Keep your wallet tucked away. It is 100% free, and always will be. But if you fancy sending a more tangible 'Thank You' note my way (which is of course appreciated!), you can do so here: [Buy me a coffee!](https://buymeacoffee.com/mohammed_taher_ghazal)

### **Why is the sharing url so long and ugly?!**

Since we don't store any data on our servers, the URL must contain all the necessary data needed to recreate your list on someone else's device. However, if you really want to have a shorter URL, you can use a URL shortening service like bit.ly or TinyURL.

### **How can I provide feedback or report issues?**

Found a bug, or just want to share some thoughts? I'd love to hear from you! Drop me a line at [mtg.software.dev@gmail.com](mailto:mtg.software.dev@gmail.com)

## Contributions

This started as a personal project, so most of it was created from my own perspective of the problems & solution.

So if you find any issue, or would like to propose an update or a new feature, feel free to open an issue here.

And if you would like to contribute to the project, then that's super appreciated!
Just create a PR that solves an already open issue (or you can create one first too).
