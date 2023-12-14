function NhanVien(
    _account,
    _name,
    _email,
    _pass,
    _ngayLam,
    _LuongCoBan,
    _ChucVu,
    _GioLam
) {
    this.account = _account
    this.name = _name
    this.email = _email
    this.password = _pass
    this.ngayLam = _ngayLam
    this.LuongCoBan = _LuongCoBan
    this.ChucVu = _ChucVu
    this.GioLam = _GioLam
    this.TongLuong = 0
    this.rank = ""
    //Method
    this.TinhTongLuong = function () {
        if (this.ChucVu === "Giám đốc") {
            this.TongLuong = this.LuongCoBan * 3
        } else if (this.ChucVu === "Trưởng phòng") {
            this.TongLuong = this.LuongCoBan * 2
        } else if (this.ChucVu === "Nhân viên") {
            this.TongLuong = this.LuongCoBan
        }
        return this.TongLuong
    }
    this.TinhXepLoai = function () {
        if (this.GioLam >= 192) {
            this.rank = "Nhân viên xuất sắc"
        } else if (this.GioLam >= 176) {
            this.rank = "Nhân viên giỏi"
        } else if (this.GioLam >= 160) {
            this.rank = "Nhân viên khá"
        } else {
            this.rank = "Nhân viên trung bình"
        }
        return this.rank
    }


}