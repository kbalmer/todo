$('#task_form').on("submit", function(e){
    e.preventDefault();
    $.ajax({
        url: "/create",
        method: "POST",
        data: $('#task_form').serialize(),
        success: function (result) {
            $("#task_table").append(result);
            $(".remove_task").off("click").on("click", remover);
        }
    })

});

$(".remove_task").on("click", remover);

function remover(e) {
    e.preventDefault();
    let targetId = e.target.id;
    $.ajax({
        url: "/delete",
        method: "POST",
        data: targetId,
        success: function(e) {
            $("#"+targetId.toString()).parent().parent().remove();
        }
    })
};