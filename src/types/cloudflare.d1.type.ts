// Define the CloudflareD1 type or object (this is just an example)
export type CloudflareD1 = {
  database: (name: string) => any;
};

// If CloudflareD1 is an actual class or object, you can export it like this:
export const CloudflareD1 = {
  database: (name: string) => {
    // Implement the function that connects to the database
    // For example purposes, this is just a mock.
    return {
      prepare: (query: string) => ({
        all: async () => {
          // Mock data for example
          return [{ id: 1, name: "vhs_sms_bot", about: "Thông báo tự động từ VHS SMS", token: "7871357504:AAGUDFsuRiyOB7yv2lcJx7PJqkGdN4Kih_M" }, { id: 2, name: "vhs_sms_uptime_bot", about: "", token: "5703535102:AAGRrabDMwxsKlWpYGeX1i3fkJYfg76ZW-0" }];
        },
      }),
    };
  },
};
