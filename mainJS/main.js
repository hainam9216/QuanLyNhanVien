const dsnv = new DSNV();

//Viet tat getele
function getEle(id) {
    return document.getElementById(id)
}

//Lay thong tin
function layttNV() {
    const _account = getEle("tknv").value
    const _name = getEle("name").value
    const _email = getEle("email").value
    const _pass = getEle("password").value
    const _ngayLam = getEle("datepicker").value
    const _LuongCoBan = getEle("luongCB").value
    const _ChucVu = getEle("chucvu").value
    const _GioLam = getEle("gioLam").value

    const nv = new NhanVien(
        _account,
        _name,
        _email,
        _pass,
        _ngayLam,
        _LuongCoBan,
        _ChucVu,
        _GioLam
    )

    //Goi method tinh tổng lương
    nv.TinhTongLuong()
    nv.TinhXepLoai()
    return nv

}

// Thêm nhân viên
getEle("btnThemNV").onclick = function () {
    // lấy thông tin sinh viên
    const nv = layttNV();

    //Kiem tra du lieu
    var kqKtra = KtraDuLieu(nv)
    if (kqKtra) {
        // thêm nv vào mảng
        dsnv.themNV(nv)

        //show table
        renderUI(dsnv.arr)

        //Luu xuong local
        setLocalStorage()
    }

}

//xoa nhan vien
function handleDelete(id) {
    //Thuc hien xoa
    dsnv.XoaNV(id)
    //Render lai
    renderUI(dsnv.arr)
    //Luu lai du lieu sau xoa
    setLocalStorage()
}
//Sua thong tin
function handleEdit(id) {
    nv = dsnv.layThongTin(id)

    if (nv) {
        //DOM, gắn value vào thẻ input
        getEle("tknv").value = nv.account
        getEle("tknv").disabled = true

        getEle("name").value = nv.name
        getEle("email").value = nv.email
        getEle("password").value = nv.password
        getEle("datepicker").value = nv.ngayLam
        getEle("luongCB").value = nv.LuongCoBan
        getEle("chucvu").value = nv.ChucVu
        getEle("gioLam").value = nv.GioLam
    }
    // hiên nút cập nhật
    getEle("btnCapNhat").disabled = false
    // ẩn nút thêm
    getEle("btnThemNV").disabled = true
}
//Cap nhatNV
getEle("btnCapNhat").onclick = function () {
    //lay tt nv
    const nv = layttNV()

    //Kiem tra du lieu
    var kqKtra = KtraDuLieu(nv)
    if (kqKtra) {
        // thêm nv vào mảng
        dsnv.capNhatNV(nv)

        //show table
        renderUI(dsnv.arr)

        //Luu xuong local
        setLocalStorage()
    }
}

//Search thong tin
getEle("searchName").addEventListener("keyup", function () {
    //Lay du lieu
    const keyword = getEle("searchName").value
    //tim Kiem
    const kqTimKiem = dsnv.TimKiemNV(keyword)
    //Render
    renderUI(kqTimKiem)
})
//đưa thông tin ra ngoai
function renderUI(data) {
    var content = ""

    for (var i = 0; i < data.length; i++) {
        const nv = data[i]
        content += `
        <tr>
            <td>${nv.account}</td>
            <td>${nv.name}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.ChucVu}</td>						
            <td>${nv.TongLuong}</td>
            <td>${nv.rank}</td>
            <td><button onclick="handleEdit('${nv.account}')" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Sửa</button></td>
            <td><button onclick="handleDelete('${nv.account}')" class="btn btn-danger">Xoá</button></td>
        </tr>
        `
        getEle("tableDanhSach").innerHTML = content
    }
}

//Kiem Tra du lieu
function KtraDuLieu(nv) {
    //Hàm thực hiện ktra
    function ktraNhapVao(
        _tk,
        _name,
        _email,
        _password,
        _ngayThang,
        _Luong,
        _Chucvu,
        _GioLam,
    ) {
        //ktra tk
        const regexTK = /^\d+$/
        if (!regexTK.test(_tk)) {
            alert("Nhập lại tài khoản")
            return false
        }

        //ktra Ten nv
        const regexName = /^[\p{L}\s'-]+$/u
        if (!regexName.test(_name)) {
            alert("Nhập lại Họ tên")
            return false
        }

        //ktra email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(_email)) {
            alert("Nhập lại email. Định dạng không hợp lệ.");
            return false;
        }
        //Ktra password
        // Ít nhất một ký tự số, một ký tự in hoa, và một ký tự đặc biệt
        const regexMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/;
        if (!regexMatKhau.test(_password) && !(_password.length >= 6 && _password.length <= 10)) {
            alert("Nhập lại mật khẩu. Yêu cầu ít nhất một ký tự số, một ký tự in hoa, và một ký tự đặc biệt. Độ dài từ 6 đến 10 ký tự.");
            return false;
        }

        //ktra ngay lam
        //mm/dd/yyyy
        const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!regexDate.test(_ngayThang)) {
            alert("Nhập lại ngày tháng. Định dạng phải là mm/dd/yyyy.");
            return false;
        }
        //ktra luong co ban
        if (!(_Luong >= 1000000 && _Luong <= 20000000)) {
            alert("Nhập lại lương")
            return false
        }
        //ktra chuc vu
        if (_Chucvu === "Giám đốc" || _Chucvu === "Trưởng phòng" || _Chucvu === "Nhân viên") {
        } else {
            alert("Hãy chọn 1 chức vụ")
            return false
        }
        //Ktra Luong
        if (!(_GioLam >= 80 && _GioLam <= 200)) {
            alert("Nhập lại giờ làm")
            return false
        }

        return true
    }
    // Gọi nhập dữ liệu và đưa kết quả
    var result = ktraNhapVao(
        nv.account,
        nv.name,
        nv.email,
        nv.password,
        nv.ngayLam,
        nv.LuongCoBan,
        nv.ChucVu,
        nv.GioLam,
    )
    return result
}

//reset thanh input
function RsInput() {
    // khoá nút cập nhật
    getEle("btnCapNhat").disabled = true
    getEle("tknv").value = ""
    //mở thanh tai khoan
    getEle("tknv").disabled = false
    getEle("name").value = ""
    getEle("email").value = ""
    getEle("password").value = ""
    getEle("datepicker").value = ""
    getEle("luongCB").value = ""
    getEle("chucvu").value = "Chọn chức vụ"
    getEle("gioLam").value = ""
}
//Nhap các nút để reset thanh input
//Nút đóng
getEle("btnDong").onclick = function () {
    RsInput()
}
//nút thêm nhân viên
getEle("btnThem").onclick = function () {
    RsInput()
}

//Lưu dữ liệu xuống localStorage
function setLocalStorage() {
    //convert data JSON => string
    const dataString = JSON.stringify(dsnv.arr)

    //Luu xuong local
    localStorage.setItem("DSNV", dataString)
}

//Lay du lieu từ local
function getLocalStorage() {
    const dataString = localStorage.getItem("DSNV")

    // Có dữ liệu mới đc hoạt động
    if (!dataString) return

    //Convert string to JSON
    const dataJSON = JSON.parse(dataString)

    //Phục hồi data cho dsnv.arr
    dsnv.arr = dataJSON

    //render
    renderUI(dsnv)
}
