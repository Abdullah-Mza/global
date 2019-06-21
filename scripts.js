var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://reqres.in/api/users?per_page=12",
	"method": "GET",
	"headers": {
		"cache-control": "no-cache",
		"Postman-Token": "8a122de8-8046-4606-8232-72af62cc6188"
	}
}
jQuery.ajax(settings).done(function (response) {
	var limit = response.data.length;
	var tbl=jQuery("<div>").attr("id","mytable");
	jQuery("#users_table").append(tbl);
	for(var i=0; i < limit; i++)
	{
		var img = response.data[i].avatar;
		var name = response.data[i].first_name + ' ' + response.data[i].last_name;
		var date = new Date();
		var strDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

		var tr='<div class="user_div" id="user-' + response.data[i].id + '">';
		var td1="<div>" + '<img src="' + response.data[i].avatar + '"' + ' alt="" />' + "</div>";
		var td2="<div>" + '<span class="user_cname">' + '<input type="text" name="uname" value="' + name + '" disabled="disabled">' + '</span>' + '<span class="user_cdate">' + strDate + "</div>";
		var td3='<div class="crud_btns">' + '<button data-id="' + response.data[i].id + '" onclick="editUser(' + response.data[i].id + ')" id="deleteuser"><i class="fa fa-pencil"></i></button>' + '<button data-id="' + response.data[i].id + '" onclick="deleteUser(' + response.data[i].id + ')" id="deleteuser"><i class="fa fa-trash"></i></button>' + "</div></div>";
		jQuery("#mytable").append(tr+td1+td2+td3);
	}
});

function createUser() {
	var username = prompt("Please enter your name", "Bruce Wayne");
	jQuery.ajax({
		url: "https://reqres.in/api/users",
		type: "POST",
		data: {
			name: username,
			movies: ["", ""]
		},
		success: function(response){
					// console.log(response);
					var date = new Date();
					var strDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
					var tr='<div class="user_div" id="user-' + response.id + '">';
					var td1="<div>"+ '<img src="avatar.png"' + ' alt="" />' +"</div>";
					var td2="<div>"+ '<span class="user_cname">' + '<input type="text" name="uname" value="' + response.name + '" disabled="disabled">' + '</span>' + '<br>' + '<span class="user_cdate">' + strDate + "</div>";
					var td3='<div class="crud_btns">' + '<button data-id="' + response.id + '" onclick="editUser(' + response.id + ')" id="deleteuser"><i class="fa fa-pencil"></i></button>' + '<button data-id="' + response.id + '" onclick="deleteUser(' + response.id + ')" id="deleteuser"><i class="fa fa-trash"></i></button>' + "</div></div>";
					jQuery("#mytable").prepend(tr+td1+td2+td3);
				}
			});
}

function deleteUser(user_id) {
	jQuery.ajax({
		url: "https://reqres.in/api/users/" + user_id,
		type: "DELETE",
		data: {},
		success: function(response){
			jQuery('button#deleteuser[data-id="' + user_id + '"]').closest(".user_div").fadeOut();
		}
	});
}


function editUser(user_id) {
	jQuery.ajax({
		url: "https://reqres.in/api/users/" + user_id,
		type: "PUT",
		data: {},
		success: function(response){
			// alert(user_id);
			jQuery("#user-" + user_id + " input").removeAttr("disabled");
			jQuery("#user-" + user_id + " input").focus();
		}
	});
	jQuery("#user-" + user_id + " input").focusout(function() {
		jQuery("#user-" + user_id + " input").attr("disabled", true);
	});
}