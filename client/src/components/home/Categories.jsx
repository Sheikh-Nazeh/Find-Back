import { categories } from "../../data/categories";


export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Browse by Category</h2>
          <p className="text-gray-500">Find lost items by category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-3">
                <category.icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 mb-1">{category.name}</span>
              <span className="text-xs text-gray-400">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
