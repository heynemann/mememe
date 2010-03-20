/*
    "Latitude":"-23.5333",
    "Longitude":"-46.6167",

*/

jQuery.twitter = {
    add: function(container, geoData){
        var url = "http://search.twitter.com/search.json?geocode=" 
                      + geoData.query.results.Response.Latitude + ","
                      + geoData.query.results.Response.Longitude + ",10km"

        console.log(url)
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                x = data

                var tweets = data.results
                
                $.each(tweets, function() {
                    var sp1 = "<span class='entry-content'><a href='http://twitter.com/" + this.from_user + "' class='tweet-url profile-pic url'>"
                              + "<img class='photo fn' height='48' src='" + this.profile_image_url + "' width='48'></a></span>"

                    $('#twitter', container).append(sp1)

                    var sp2 = "<span class='status-body'><strong><a href='http://twitter.com/" + this.from_user + "' class='tweet-url screen-name'>"
                              + this.from_user + "</a></strong>"
                              + "<span class='entry-content'>" + this.text + "</span>"


                    $('#twitter', container).append(sp2).append("<br>")
                })
            },
        })
  }
}


/*

entry-content{font-size:1.77em;}


 <span class="entry-content"><a href="http://twitter.com/danielduende" class="tweet-url profile-pic url"><img alt="Daniel Duende" class="photo fn" height="48" src="http://a3.twimg.com/profile_images/263924547/Duende_normal.jpg" width="48" /></a></span>  

<span class="status-body">
          <strong><a href="http://twitter.com/danielduende" class="tweet-url screen-name">danielduende</a></strong>
              <span class="actions"><div>      <a id="status_star_10786963738" class="fav-action non-fav" title="favorite this tweet">&nbsp;&nbsp;</a>
</div></span>

<span class="entry-content">Já que hoje é <a href="/search?q=%23diamundialsemcarne" title="#diamundialsemcarne" class="tweet-url hashtag" rel="nofollow">#diamundialsemcarne</a>, selecionei alguns livros de receitas sem carne e outras delícias éticas. Tuíto no @<a class="tweet-url username" href="/sebinho406n" rel="nofollow">sebinho406n</a>.</span>

        <span class="meta entry-meta" data='{}'>
  <a class="entry-date" rel="bookmark" href="http://twitter.com/danielduende/status/10786963738">
    <span class="published timestamp" data="{time:'Sat Mar 20 19:39:24 +0000 2010'}">less than a minute ago</span>

  </a>
  <span>via web</span>
    

*/