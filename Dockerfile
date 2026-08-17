# Sử dụng image Nginx Alpine siêu nhẹ
FROM nginx:alpine

# Xóa các file mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy toàn bộ file tĩnh của dự án vào thư mục của Nginx
COPY . /usr/share/nginx/html

# Mở cổng 80 cho web server
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]
