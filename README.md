# Smart Video Games Rater

An app that allows you to create a sorted list of games & order them smartly with minimal efforts.
If you have a list of 1000 games & you want to add a new one but not sure where exactly, we will ask you to compare it against at MAXIMUM 10 other games, & we will figure out the exact place it should be in!

## What can I use this for?

Well, I personally created it to more easily navigate through my backlog of games I want to play.
But you can do that for:

- Your top 10 games of all time
- Top games you want to buy
- Top games you want to play next
  Whatever you want.

## FAQs

#### What is this website?

It's an app that allows you to create a list of games & sort them very quickly smartly

#### How is this any different from other websites that also allows you to create a list of games?

The more games you have in your list, the harder it is for you to put it in the right place, so you usually either throw it at the top or bottom, or somewhere in the middle randomly.
Whereas here, we use a smart algorithm that determins the right position for the game by asking you a very few questions (if you have 1000 games in your list, it will only ask you a maximum of 10 questions to figure the place for a newly added game)

#### What is this smart algorithm that is used to find the right place for a game?

This will be a bit techincal, but if you are interested, read on.
The core of the algorithm is to use AVL trees.
AVL trees are a kind of binary search trees that are self-balancing on each insertion/deletion.
This allows us to cut the search area by half with each question to the user.

#### How did this project come to life?

This started as a personal project because my games backlog (games I'm planning to play), & my "played games" lists were getting quite big, & whenever I wanted to add a new game to the list, I would spend a lot of time trying to figure out the best place for it (especially in the backlog case). So then I decided to build this website after I didn't find anything online that could help.
After I showed it to a few of my friends, they liked it & asked me if I could put it online so they could use it, I did that, improved on it, & shared it with everyone.

#### How do I add a game to my list?

To add a game to your list, simply click on the "Add Game" button and enter the necessary information such as the game's title, genre, and release date. The smart algorithm will then determine the optimal position for the game in your sorted list.

#### Can I rearrange the order of my games manually?

Yes, you have the option to manually rearrange the order of your games if you prefer. Simply drag and drop the games to the desired position in the list. The smart algorithm will adjust accordingly and maintain the overall sorting.

#### How can I compare games during the sorting process?

When the smart algorithm asks you to compare a game with others, it will present you with two games side by side and ask you to choose which one should come first. Based on your selection, the algorithm will continue to narrow down the search area until it finds the optimal position for the game.

#### Is there a limit to the number of games I can have in my list?

There is no specific limit to the number of games you can have in your list. The smart algorithm is designed to handle large lists efficiently, so you can add as many games as you want without any performance issues.

#### Where are my lists data stored?

All the data is stored locally on your browser storage. We don't store anything.
So it is VERY HIGHLY recommended that you regulary create a backup file of your data which can be done easily from the sidebar. ("Export Data to a Backup File" button)

Keep the backup file wherever you want, & you can later very easily restore the data from it also from the sidebard ("Import Data From Backup File" button)

#### Where are the games data coming from?

All the games data is coming from igdb.com api. So if you find anything missing or needs updating, you can go update it there, don't send to me about this please 😅.

#### Is this free to use?

Yes, this is free & will remain so forever.
But if you feel like you want to support or thank me, it's surely appreciated!
You can buy me a cup of coffer here: https://buymeacoffee.com/mohammed_taher_ghazal

#### Can I share my list with others?

For now, no.
Since all the data is only stored locally, it's not possible to send others a URL that they can view.
If I have the capacity in the future, I might add it.

#### How can I provide feedback or report issues?

If you have any feedback or encounter any issues while using the app, you can let me know by sending me an email here: mtg.software.dev@gmail.com
