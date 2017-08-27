$(function () {
    $('.img-pop').click(function () {
       $('.popContainer').show(1000);
    });

    //点击图片上传文件
   $('.img-add').click(function () {
       $('#add-file').trigger('click');
       // $('#add-file').click();//直接触发
   });

   $('.file-close').click(function () {
      $('.popContainer').hide();
   });
});