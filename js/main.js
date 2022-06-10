let modal1 ,sysModal,errorAry;
$(document).ready(function(){
    init();
});
function init(){
    modal1 = new bootstrap.Modal('#modal1');
    sysModal = new bootstrap.Modal('#sysModal');
    $('.btn-launch').click(function(event){
        // console.log($(this).attr('centered'));
        if($(this).attr('static')==''){
            modal1 = new bootstrap.Modal('#modal1',{backdrop:'static'});
            //無法按後面的黑色關掉
        }
        else {
            modal1 = new bootstrap.Modal('#modal1');// 因為會保留前一個設定 所以要清掉之前的
        }
		let mType =($(this).attr('mType'))?$(this).attr('mType'):0;
		let mBgc=($(this).attr('mBgc'))?$(this).attr('mBgc'):'none';
		let mTitle=($(this).attr('mTitle'))?$(this).attr('mTitle'):'none';
		let isCenter =($(this).attr('centered')=='')?1:0;
       
		launchModal1(mType, mBgc, mTitle, isCenter);
	});
}
function launchModal1(mType, mBgc, mTitle, isCenter){
    $('#modal1 .modal-dialog').removeClass('modal-dialog-centered');//去掉之前的模板
    
    $('#modal1 .modal-content').removeClass('modal-bgc1');
    $('#modal1 .modal-header').removeClass('header1');
    $('#modal1 .modal-header').removeClass('header2');
    $('#modal1 .modal-body').removeClass('hz-450');
    $('#modal1 .modal-content').removeClass('modal-bgc0');
	$('#modal1 .modal-dialog').removeClass('modal-lg');
	$('#modal1 .modal-body').removeClass('hz-450');
	$('#modal1 .modal-header').show();
	$('#modal1 .modal-footer').show();
	$('#modal1 .modal-body').html('');
    $('#modal1 .modal-dialog').removeClass('modal-fullscreen');
    $('#modal1 .btn-close').show();
    $('#modal1 .btn-close2').show();
    $('#modal1 .btn-option').html('save changes');
    if(mBgc!='none'){
		$('#modal1 .modal-content').addClass('modal-bgc'+mBgc);
	}
    if(mTitle != 'none'){
        $('#modal1 .modal-header .text').html( mTitle);//如果有傳值就替換
    }
    switch(mType){
		case '1':
            $('#modal1 .modal-header').addClass('header1');
			break;
        case '2':
            $('#modal1 .modal-header').addClass('header2');
            break;  
        case '7':
            $('#modal1 .modal-dialog').addClass('modal-lg');
            $('#modal1 .modal-body').addClass('hz-450');
            $('#modal1 .modal-body').html(`
                <div class="dialogGame">
					<div class="dialogGameClose " data-bs-dismiss="modal"></div>
					
					<div class="dialogGameTitle">${mTitle}</div>	
				</div>
            
            `);
            $('#modal1 .modal-header').hide();
            $('#modal1 .modal-footer').hide();
            break;
        case '8':
            $('#modal1 .modal-dialog').addClass('modal-lg');
            $('#modal1 .modal-dialog').addClass('modal-fullscreen');
            $('#modal1 .modal-body').html(`
            
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/otR3-qidKGQ?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        
            `);
            $('#modal1').on('hidden.bs.modal', function(e){
                let iframe= $(this).find('iframe');
                iframe.removeAttr('src');
                $(this).unbind('hidden.bs.modal');
            });
             break;    
        case '9':
            $('#modal1 .modal-body').html(`
            <div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">@</span>
			<input name="Username" type="text" class="form-control" placeholder="Username">
		    </div>
		    <div class="input-group mb-3">
			    <input name="Username2" type="text" class="form-control" placeholder="Recipient's username">
			    <span class="input-group-text" id="basic-addon2">@example.com</span>
		    </div>
		    <label for="basic-url" class="form-label">Your vanity URL</label>
		    <div class="input-group mb-3">
			    <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
			    <input name="Username3" type="text" class="form-control" id="basic-url">
		    </div
            `);
            $('#modal1 .btn-close').hide();
            $('#modal1 .btn-close2').hide();
            $('#modal1 .btn-option').html('確認');
            $('#modal1 .btn-option').click(function(e){
                errorAry = [];
                if($('#modal1 input[name=Username]').val() == ''){
                    let tmpObj ={};
                    tmpObj.msg='第1欄沒有填';
                    errorAry.push(tmpObj);
                };
                if($('#modal1 input[name=Username2]').val() == ''){
                    let tmpObj ={};
                    tmpObj.msg='第2欄沒有填';
                    errorAry.push(tmpObj);
                };
                if($('#modal1 input[name=Username3]').val() == ''){
                    let tmpObj ={};
                    tmpObj.msg='第3欄沒有填';
                    errorAry.push(tmpObj);
                };
                console.log(errorAry);
                modal1.hide();//關掉視窗
                
            });
            //on裡面放要監聽的事件 ''內放對象
            $('#modal1').on('hidden.bs.modal',function(e){
                    //  如果裡面不適空的
                    if(errorAry.length >0){
                            // 把第一個塞進來的移除回傳
                            showAlert(errorAry.shift().msg);
                    }
                    else{
                        $(this).unbind('hidden.bs.modal');
                        $('#sysModal').unbind('hidden.bs.modal');
                        //送進資料庫的語法接在這裡
                    }
            });//完全關閉
            $('#sysModal').on('hidden.bs.modal',function(e){
                //  在sysModal 關掉後重新打開modal1 
                modal1.show();
            });
                break;
	}
    if(isCenter==1){
        $('#modal1 .modal-dialog').addClass('modal-dialog-centered');

    };
    
    modal1.show();
    // console.log(isCenter );
}
function showAlert(content){
    $('#sysModal .modal-body').html(content);
    $('#sysModal .btn-option').click(function(event){
        //this會找同一層的==#sysModal .btn-option
        $(this).unbind('click');
        sysModal.hide();
    });
    sysModal.show();
}