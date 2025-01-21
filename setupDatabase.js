(async () => {
    try {
      await sequelize.sync();  // 데이터베이스 테이블을 동기화합니다.
      console.log('Tables have been created successfully.');
  
      // 예시 데이터 입력 (임시)
      const newUser = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
  
      const newLocation = await Location.create({
        user_id: newUser.id,
        name: 'University Library',
        roles: ['Librarian', 'Student'],
        is_public: true
      });
  
      console.log('Initial data created successfully.');
    } catch (error) {
      console.error('Unable to create tables and data:', error);
    }
  })();
  