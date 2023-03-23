const generateQuote = function () {
  const text = [{ quote: "Imperfection is beauty, madness is genius and it’s better to be absolutely ridiculous than absolutely boring.", author: "Marilyn Monroe" },
  { quote: "Study, learn more, learn forever.", author: "V. I. Lenin" },
  { quote: "Nothing is more precious than independence and liberty.", author: "Ho Chi Minh" },
  { quote: "Workers of the world, unite! You have nothing to lose but your chains!", author: "K. Marx & F. Engels" },
  { quote: "The third world is not poor. You don't go to poor countries to make money. Most countries are rich. Only the people are poor. Ordinary people pay the costs of empire. These countries are not underdeveloped, they are over exploited.", author: "Michael Parenti" },
  { quote: "Never interrupt your enemy when he is making a mistake.", author: "Napoleon Bonaparte" }];

  let index = Math.floor(Math.random() * text.length);
  document.getElementById("text").innerHTML = '"' + text[index].quote + '"';
  document.getElementById("author").innerHTML = "-" + text[index].author;

  document.getElementById("tweet-quote").href = "https://twitter.com/intent/tweet?text=" + text[index].quote + "-author:" + text[index].author;
};

window.onload = function () {
  generateQuote();
  document.getElementById("new-quote").addEventListener('click', generateQuote);
};