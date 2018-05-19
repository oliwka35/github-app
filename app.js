$(document).ready(function() {
  let username;
  $('#searchUser').on('focusout', function(e) {
    username = e.target.value;

    //Make a request to GitHub
    $.ajax({
      url: 'https://api.github.com/users/' + username + '/repos',
      data: {
        client_id: "f8dde520729fe3025149",
        client_secret: "7b9693845188af80bd49f497185577b006837756"
      }
    }).done(function(repos) {

      //Remove previous user's repositories
      $('#searchUser').on('keyup', function() {
        $('#selectRepo').empty();
      });

      //Add repositories to datalist
      $.each(repos, function(i, repo) {
        $('#selectRepo').append("<option value='" + `${repo.name}` + "'>" + `${repo.name}` + "</option>");
      });
    });
    //Get Issues Of Selected Repo
    $('#search').on('click', function() {
      let reponame = $('#selectRepo').val();
      //Make a request to GitHub
      $.ajax({
        url: 'https://api.github.com/repos/' + username + '/' + reponame + '/issues',
        data: {
          client_id: "f8dde520729fe3025149",
          client_secret: "7b9693845188af80bd49f497185577b006837756",
        }
      }).done(function(issues) {
        //Show issues
        $('.quote').addClass("hide");
        $('form').addClass("moveTop");
        $(".wrapper").css("padding-top", "0");
        $('#issues').addClass("fadeIn");
        $('#issues').html(`
    <div class="thead row">
      <div>
      <strong>Number</strong>
      </div>
      <div>
      <strong>title</strong>
      </div>
      <div>
        date
      </div>
    </div>
    `)
        $.each(issues, function(index, issue) {
          $('#issues').append(`
        <div class="issue">
          <div class="row">
            <div>
            <p>${issue.number}</p>
            </div>
            <div>
            <p>${issue.title}</p>
            </div>
            <div>
          <p>${issue.created_at}</p>
            </div>
          </div>
          <div class="hide">
            <div class="user-info">
              <div>
                <img class="avatar" src="${issue.user.avatar_url}">
              </div>
              <div class="user">
                <p class="login">${issue.user.login}</p>
                <button><a href="${issue.user.html_url}">Github Page</a></button>
              </div>
            </div>
          </div>
      </div>
          `);
        });
        //Show info about user
        $('.row').on("click", function() {
          $(this).siblings(".hide").slideToggle()

          return false; //Prevent the browser jump to the link anchor
        });

        $('#selectRepo').on('click', function() {
          $('#issues').empty();
        });
      });
    });
  });
});
