
function xdata(){
        return{
              username:'',
              password:'',
              tgllhr:'',
              logedIn: false,
              page:'login',
              nama:'',
              orang:[],
              out(){
                this.page='login';
                this.username='';
                this.password='';
                this.logedIn=false;
                }
              }
            }


function groupedOrang() {
        // Mengelompokkan data berdasarkan tanggal
        const groups = this.orang.reduce((acc, exam) => {
            if (!acc[exam.tglPemeriksaan]) {
                acc[exam.tglPemeriksaan] = [];
            }
            acc[exam.tglPemeriksaan].push(exam);
            return acc;
        }, {});

        // Mengurutkan tanggal dari yang terlama ke terbaru
        const sortedGroups = {};
        Object.keys(groups)
            .sort((a, b) => new Date(a) - new Date(b)) // Urutkan tanggal
            .forEach((tglPemeriksaan) => {
                sortedGroups[tglPemeriksaan] = groups[tglPemeriksaan];
            });

        return sortedGroups;
    }


function kirimData() {
  this.logedIn = true;
  cekpassword = this.password;
  cekusername = this.username;
  t = cekusername.substring(6,8)-40;
  tg = (t < 10 ? "0"+t : t);
  tgl = (cekusername.substring(6,8) < 35)? cekusername.substring(6,8) : tg;
  bl = cekusername.substring(8,10);
  thn = (cekusername.substring(10,12) < 50)? "20"+cekusername.substring(10,12) : "19"+cekusername.substring(10,12);
  tgllhr = tgl+""+bl+""+thn;
  lanjut = (cekpassword == tgllhr) ? true : false;
  console.log('tgllhr '+tgllhr);
  
  
  if (lanjut) {

     axios.get('https://script.google.com/macros/s/AKfycbxVcSs5bM_B8mpCb-zIpZpX9v8MFSmZM2Oh5gmKING0Qu9ndtt4dUmLH2H-7qu_i-I7aQ/exec',{
              params:{
                nik:this.username
               }
          })
        .then(response => {
                data = response.data;
                this.orang = data;
                console.log(data);
                if (data == 'Data tidak ditemukan') {
                    this.page = 'login';
                    this.logedIn = false;
                    showAlert('Warning','Gagal login username atau password salah!!');
                }else{
                    this.page = 'home';
                    // groupedOrang()

                }
        })
        .catch(error => {
            console.error(error);
            this.page = 'login';
            this.logedIn = false;
            showAlert('Warning','Gagal login username atau password salah!!!');
        });

  }else{
    showAlert('Warning','Gagal login username atau password salah!');
    this.username='';
    this.password='';
    this.logedIn=false;
  }
}
      



function showAlert(tt,isi) {
  Swal.fire({
    title: tt,
    text: isi,
    icon: '',
    confirmButtonText: 'OK'
  })
}
