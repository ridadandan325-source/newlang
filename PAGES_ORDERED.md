# ترتيب صفحات المشروع - Lingofy Multi-Language Quiz Application

## 📋 قائمة الصفحات بالترتيب

### الصفحة 1: Landing Page (الصفحة الرئيسية)
**الملف:** `index.html`
**الوصف:** الصفحة الرئيسية مع Hero Section و Feature Cards

---

### الصفحة 2: Register Page (صفحة التسجيل)
**الملف:** `register.html`
**الوصف:** صفحة إنشاء حساب جديد مع اختيار الدور (Student/Admin)

---

### الصفحة 3: Login Page (صفحة تسجيل الدخول)
**الملف:** `login.html`
**الوصف:** صفحة تسجيل الدخول للمستخدمين

---

### الصفحة 4: Admin Dashboard (لوحة تحكم المدير)
**الملف:** `admin-dashboard.html`
**الوصف:** لوحة تحكم المدير مع إحصائيات وجدول النماذج

---

### الصفحة 5: Form Builder (منشئ النماذج)
**الملف:** `form-builder.html`
**الوصف:** صفحة إنشاء وتعديل الاختبارات مع Question Builder واختيار اللغة (Admin only)

---

### الصفحة 6: Admin Theme Customization (تخصيص الثيم)
**الملف:** `admin-theme.html`
**الوصف:** صفحة تخصيص الثيم مع Live Preview

---

### الصفحة 7: Student Tests (الاختبارات المتاحة للطالب)
**الملف:** `student-tests.html`
**الوصف:** صفحة عرض الاختبارات المتاحة للطلاب

---

### الصفحة 8: Test Taking (صفحة حل الاختبار)
**الملف:** `test-taking.html`
**الوصف:** صفحة حل الاختبار مع Progress Bar

---

### الصفحة 9: Results (صفحة النتائج)
**الملف:** `results.html`
**الوصف:** صفحة عرض النتائج مع Score Circle و Summary Table

---

### الصفحة 10: 404 Error Page (صفحة الخطأ)
**الملف:** `404.html`
**الوصف:** صفحة خطأ 404 عند عدم وجود الصفحة

---

### الصفحة 11: Empty State (صفحة الحالة الفارغة)
**الملف:** `empty-state.html`
**الوصف:** صفحة الحالة الفارغة عند عدم وجود اختبارات

---

## 🔗 تدفق التنقل بين الصفحات

```
1. index.html (Landing)
   ├── → register.html (Register)
   ├── → login.html (Login)
   └── → student-tests.html (Student Tests)

2. register.html
   ├── → login.html
   └── → admin-dashboard.html (if Admin) / student-tests.html (if Student)

3. login.html
   ├── → register.html
   └── → admin-dashboard.html (if Admin) / student-tests.html (if Student)

4. admin-dashboard.html
   ├── → form-builder.html
   ├── → admin-theme.html
   └── → index.html (Logout)

5. form-builder.html
   └── → admin-dashboard.html

6. admin-theme.html
   └── → admin-dashboard.html

7. student-tests.html
   ├── → test-taking.html
   └── → index.html (Logout)

8. test-taking.html
   └── → results.html

9. results.html
   └── → student-tests.html

10. 404.html
    └── → index.html

11. empty-state.html
    └── → index.html / student-tests.html
```

